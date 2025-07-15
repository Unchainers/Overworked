use candid::CandidType;

pub trait HasFields {
    fn get_field(&self, field_name: &str) -> String;
}

#[derive(Clone, CandidType)]
#[allow(non_camel_case_types)]
pub enum Operator {
    EQUAL,
    NOT_EQUAL,
    LESS_THAN,
    LESS_THAN_OR_EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    NOT_ILIKE,
    ILIKE,
    BETWEEN,
    NOT_BETWEEN,
    IN,
    NOT_IN,
}

#[derive(Clone, CandidType)]
pub struct Filter {
    pub field: String,
    pub operator: Operator,
    pub value: String,
    pub between: Option<(String, String)>,
    pub values: Option<Vec<String>>,
}

#[derive(Clone, CandidType)]
pub struct PaginatorResponse<T: Clone> {
    pub total_data: usize,
    pub curr_page: usize,
    pub data: Vec<T>,
}

#[derive(Clone)]
pub struct Paginator<T> {
    pub data: Vec<T>,
    pub filters: Vec<Filter>,
}

impl<T: Clone + HasFields + 'static> Paginator<T> {
    pub fn new(data: Vec<T>, filters: Vec<Filter>) -> Paginator<T> {
        Self { data, filters }
    }

    fn normalize_value(value: String) -> String {
        value.trim().to_lowercase()
    }

    pub fn filter_data(&self, data: Option<Vec<T>>, filters: Option<Vec<Filter>>) -> Vec<T>
    where
        T: Clone + 'static + HasFields, // You define HasFields to get field value by name
    {
        let filtered_data = data.unwrap_or(self.data.clone());
        let used_filters = filters.unwrap_or(self.filters.clone());

        filtered_data
            .into_iter()
            .filter(|item| {
                used_filters.iter().all(|filter| {
                    let field_value = Self::normalize_value(item.get_field(&filter.field));
                    let filter_value = Self::normalize_value(filter.value.to_string());

                    match filter.operator {
                        Operator::EQUAL => field_value == filter_value,
                        Operator::NOT_EQUAL => field_value != filter_value,
                        Operator::LESS_THAN => field_value < filter_value,
                        Operator::LESS_THAN_OR_EQUAL => field_value <= filter_value,
                        Operator::GREATER_THAN => field_value > filter_value,
                        Operator::GREATER_THAN_OR_EQUAL => field_value >= filter_value,
                        Operator::ILIKE => field_value.contains(&filter_value),
                        Operator::NOT_ILIKE => !field_value.contains(&filter_value),
                        Operator::BETWEEN => {
                            if let Some((min, max)) = &filter.between {
                                let min = Self::normalize_value(min.to_string());
                                let max = Self::normalize_value(max.to_string());
                                field_value >= min && field_value <= max
                            } else {
                                false
                            }
                        }
                        Operator::NOT_BETWEEN => {
                            if let Some((min, max)) = &filter.between {
                                let min = Self::normalize_value(min.to_string());
                                let max = Self::normalize_value(max.to_string());
                                field_value < min && field_value > max
                            } else {
                                false
                            }
                        }
                        Operator::IN => filter
                            .values
                            .as_ref()
                            .map(|vals| {
                                vals.iter()
                                    .map(|v| Self::normalize_value(v.clone()))
                                    .any(|v| field_value == v)
                            })
                            .unwrap_or(false),
                        Operator::NOT_IN => filter
                            .values
                            .as_ref()
                            .map(|vals| {
                                vals.iter()
                                    .map(|v| Self::normalize_value(v.clone()))
                                    .all(|v| field_value != v)
                            })
                            .unwrap_or(true),
                    }
                })
            })
            .collect()
    }

    pub fn get(&self, page: usize, per_page: usize) -> PaginatorResponse<T> {
        let count = self.data.len();

        let total_page = count / per_page;

        let start = (page - 1) * per_page;
        let end = (start + per_page).min(count);

        let normalized_page = if page > total_page { total_page } else { page };

        let mut fetched_data = vec![];

        if start < count {
            fetched_data = self.data[start..end].to_vec();
        }

        if !self.filters.is_empty() {
            fetched_data = self.filter_data(Some(fetched_data), None);
        }

        PaginatorResponse {
            total_data: fetched_data.len(),
            curr_page: normalized_page,
            data: fetched_data,
        }
    }

    pub fn total(&self) -> usize {
        self.data.len()
    }
}
