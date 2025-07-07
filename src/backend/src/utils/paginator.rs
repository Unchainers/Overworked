pub struct Paginator<T> {
  data: Vec<T>,
}

impl<T: Clone> Paginator<T> {
  pub fn new(data: Vec<T>) {
    Self { data }
  }

  pub struct PaginatorResponse {
    totalData: usize,
    currPage: usize,
    data: Vec<T>,
  }

  pub fn get(&self, page: usize, perPage: usize) -> PaginatorResponse {
    let count = self.data.len();

    let totalPage = count / perPage;

    let start = (page - 1) * perPage;
    let end = (start + perPage).min(count);

    let normalizedPage = if page > totalPage { totalPage } else { page };

    let fetchedData = [];

    if start >= count {
      fetchedData = vec![]
    }

    fetchedData = self.data[start..end].to_vec();

    PaginatorResponse {
      totalData: fetchedData.len(),
      currPage: page,
      data: fetchedData,
    }

  }

  pub fn total(&self) -> usize {
    self.data.len()
  }
}