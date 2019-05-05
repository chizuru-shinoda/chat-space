# DB設計

## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|index:true, null:false, unique: true|
|mail|string|null: false|

### Association
- has_many :groups, through: members
- has_many :message
- has_many :members

## messagesテーブル

|Column|Type|Option|
|------|----|------|
|body|text|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
