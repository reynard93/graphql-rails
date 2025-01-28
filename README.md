# Rails GraphQL

A GraphQL API for managing restaurant menus with configurable items and modifiers.

## Project Overview
### Purpose
GraphQL API for restaurant menu management

### Key Features
* Menu structure with sections
* Configurable and non-configurable items
* Modifier groups with validation rules
* Product and Component type support

### Tech Stack
* Ruby 3.3.6
* Rails 8.0
* GraphQL-Ruby
* SQLite3

## Setup Instructions

### Prerequisites
* Ruby 3.3.6
* SQLite3
* Docker (optional)

### Environment Variables
```bash
# Required for local development
SECRET_KEY_BASE=your_secret_key
RAILS_MASTER_KEY=your_master_key

# Required for Docker
RAILS_ENV=production
DATABASE_URL=sqlite3:/rails/production.sqlite3
```

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/reynard93/graphql-rails.git
cd rails_grain_graphql

# Install dependencies
bundle install

# Setup database
bin/rails db:create db:migrate db:seed

# Start the server
bin/rails server
```

### Docker Setup
```bash
docker build -t rails_grain_graphql .

docker run -d -p 3000:80 \
  -e SECRET_KEY_BASE=dummy \
  -e RAILS_MASTER_KEY=$(cat config/master.key) \
  --name rails_grain_graphql \
  rails_grain_graphql
```

## Database Architecture

### Core Models and Relationships
#### Menu
* has_many :sections
* has_many :items, through: :sections
* attributes: identifier, label

#### Section
* belongs_to :menu
* has_many :items
* attributes: identifier, label

#### Item (STI base class)
##### Product (type)
* has_many :modifier_groups
* attributes: label, price

##### Component (type)
* belongs_to :modifier_group
* attributes: label, price

#### ModifierGroup
* has_many :modifiers
* attributes: label, selectionRequiredMin, selectionRequiredMax

### Database Setup
```ruby
# Initialize database
bin/rails db:create db:migrate db:seed
```

### Database Seed Data

#### Sample Menu Structure
```ruby
menu = Menu.create!(identifier: "sample_menu", label: "Sample Menu")
section1 = menu.sections.create!(identifier: "non_configurable", label: "Non-configurable Items")
section2 = menu.sections.create!(label: "Configurable Items", identifier: "configurable")
```

#### Non-configurable Items
```ruby
item1 = Product.create!(label: "Burger", price: 10.99)
item2 = Product.create!(label: "Fries", price: 3.99)
section1.items << [ item1, item2 ]
```

#### Configurable Items with Modifiers
```ruby
pizza = Product.create!(label: "Pizza", price: 12.99)
section2.items << pizza

# With multiple modifier groups:
- Size group (required, single selection)
- Crust group (required, single selection)
- Toppings group (optional, up to 5 selections)
```

## API Documentation

### Authentication
* Currently no authentication required
* Future implementations will use Bearer token

### Query Examples

#### Fetch Menu with All Details
```graphql
{
  menu(id: 1) {
    label
    sections {
      label
      items {
        label
        price
        modifierGroups {
          label
          selectionRequiredMin
          selectionRequiredMax
          modifiers {
            item {
              label
              price
            }
            defaultQuantity
          }
        }
      }
    }
  }
}
```

#### Fetch Modifier Group Details
```graphql
{
  modifierGroup(id: 1) {
    id
    label
    selectionRequiredMin
    selectionRequiredMax
    modifiers {
      id
      item {
        label
        price
      }
    }
  }
}
```

### Error Handling

Currently, the API implements basic error handling through GraphQL-Ruby's default error handling mechanism. Future improvements will include:

- Custom error types for validation errors
- Detailed error messages with proper error codes
- Structured error responses for not found cases
- Proper error tracking and logging

#### Current Error Response Format
```json
{
  "errors": [
    {
      "message": "Error message",
      "locations": [{ "line": 2, "column": 10 }],
      "path": ["fieldName"]
    }
  ]
}
```

### Sample Response
```json
{
  "data": {
    "menu": {
      "label": "Sample Menu",
      "sections": [
        {
          "label": "Non-configurable Items",
          "items": [
            {
              "label": "Burger",
              "price": 10.99
            },
            {
              "label": "Fries",
              "price": 3.99
            }
          ]
        },
        {
          "label": "Configurable Items",
          "items": [
            {
              "label": "Pizza",
              "price": 12.99,
              "modifierGroups": [
                {
                  "label": "Size",
                  "selectionRequiredMin": 1,
                  "selectionRequiredMax": 1,
                  "modifiers": [
                    {
                      "item": {
                        "label": "Small",
                        "price": 0.0
                      },
                      "defaultQuantity": 1
                    },
                    {
                      "item": {
                        "label": "Medium",
                        "price": 2.0
                      },
                      "defaultQuantity": 0
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## Testing

### Running Tests
```bash
bundle exec rspec
```

### Test Coverage
#### Current Coverage
* Basic field resolution ✅
* Association loading ✅
* Filtering (for items by section) ✅
* Validation tests for ModifierGroup ✅

#### Pending Tests
##### Item Type Tests
* Type discrimination (Product vs Component)
* Price override in modifiers
* Default quantity in modifiers

##### Menu Type Tests
* Date range filtering (start_date/end_date)
* State transitions
* Section ordering by display_order

##### Section Type Tests
* Item ordering by display_order
* Menu association
* Empty section behavior

##### Modifier Group Type Tests
* Modifier ordering by display_order
* Item associations through ItemModifierGroup
* Edge cases for min/max selection requirements

## Performance Monitoring & Optimization

### Optimizations (TODO)
1. Implement graphql-batch for N+1 query prevention
2. Add database indexing on frequently queried fields
3. Implement field-level caching
4. Add query complexity limits
5. Consider connection types for pagination
6. Implement persisted queries

### Metrics to Track
#### Query Performance
* Resolution time per field
* Number of database queries per request
* Query depth and complexity
* Cache hit/miss rates

#### Database Metrics
* Query execution time
* Index usage statistics
* Connection pool utilization
* Read vs Write ratio

#### Application Metrics
* Request/Response times
* Memory usage
* Active record object allocation
* Garbage collection cycles

### Monitoring Tools
* GraphQL Query Analyzer
* New Relic/Scout for APM
* rack-mini-profiler for development
* ActiveRecord query logging