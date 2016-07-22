resource "aws_dynamodb_table" "users" {
  name = "users"
  read_capacity = 1
  write_capacity = 1
  hash_key = "userId"

  attribute {
    name = "userId"
    type = "S"
  }
}
