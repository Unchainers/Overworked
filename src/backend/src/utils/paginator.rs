pub struct Paginator<T> {
  data: Vec<T>,
}

impl<T: Clone> Paginator<T> {
  pub fn new(data: Vec<T>) {
    Self { data }
  }

  pub fn get(&self, page: usize, perPage: usize) -> Vec<T> {
    let count = self.data.len();

    let totalPage = count / perPage;

    let start = (page - 1) * perPage;
    let end = (start + perPage).min(count);

    let normalizedPage = if page > totalPage { totalPage } else { page };

    if start >= count {
      vec![]
    }

    self.data[start..end].to_vec()
  }

  pub fn total(&self) -> usize {
    self.data.len()
  }
}