#[derive(Clone)]
pub struct Paginator<T> {
    data: Vec<T>,
}

#[allow(dead_code)]
#[derive(Clone)]
pub struct PaginatorResponse<T: Clone> {
    total_data: usize,
    curr_page: usize,
    data: Vec<T>,
}

impl<T: Clone> Paginator<T> {
    pub fn new(data: Vec<T>) -> Paginator<T> {
        Self { data }
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
