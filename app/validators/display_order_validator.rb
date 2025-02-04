class DisplayOrderValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value.present? && value.is_a?(Integer) && value > 0
      record.errors.add(attribute, "must be a positive integer")
    end
  end
end
