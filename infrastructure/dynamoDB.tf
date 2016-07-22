resource "aws_dynamodb_table" "users" {
  name = "users"
  read_capacity = 1
  write_capacity = 1
  hash_key = "userId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "fbId"
    type = "S"
  }

  global_secondary_index {
    name = "FbIdIndex"
    hash_key = "fbId"
    write_capacity = 1
    read_capacity = 1
    projection_type = "ALL"
  }

}
