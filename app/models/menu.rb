class Menu < ApplicationRecord
  has_many :sections
  validates :label, presence: true
end
