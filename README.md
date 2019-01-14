## README

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|message_id|text|null: true, foreign_key: true|

### Association
- has_many :messages
- has_many :users

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|integer|null: false, foreign_key: true|
|message_id|text|null: true, foreign_key: true|
|group_id|integer|null: true, foreign_key: true|

### Association
- has_many :groups
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|dody|text|null: false, foreign_key: true|
|image|string|null: true, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
