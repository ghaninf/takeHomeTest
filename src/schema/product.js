const SchemaProduct = {
  CreateProduct: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      sell: { type: 'number' },
      stock: { type: 'number' },
      base64: { type: 'string' }
    },
    required: [
      'name',
      'price',
      'sell',
      'stock',
      'base64'
    ]
  }
}

module.exports = SchemaProduct