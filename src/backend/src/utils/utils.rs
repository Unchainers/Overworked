pub trait HasFields {
  fn get_field(&self, field_name: &str) -> String;
}