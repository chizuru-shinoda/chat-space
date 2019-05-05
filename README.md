# DB設計

## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false, unique: true|
|password|string|null: false, unique: false|

### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: false|

### Association
- has_many :users, through: members
- has_many :messages
- has_many :members

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text|null: true, unique: false|
|image|string|null: true, unique: false|
|user_id|integer|null: false, unique: false, foreign_key: true|
|group_id|integer|null: false, unique: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, unique: false, foreign_key: true|
|group_id|integer|null: false, unique: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
