import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// mongoose.connect(process.env.NEXT_PUBLIC_DB_URL);
// mongoose.Promise = global.Promise;
var dbConnection = mongoose.createConnection(process.env.dbConnection_URL, 'test')
dbConnection.on('error', console.error.bind(console, 'connection error:'));

// var a1= db.once('open',function(){
//   User.find({},{},function (err, users) {
//     mongoose.connection.close();
//     console.log("Username supplied"+username);
//     //doSomethingHere 
//   })
// });

export const db = {
  Product: productSchema()
};

function productSchema() {
  const schema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    price: {
      type: Number,
      required: true
    },
    sell: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    base64: {
      type: String,
      required: true
    },
    createdAt: Number,
    updatedAt: Number,
    deletedAt: {
      type: Number,
      default: 0
    }
  }, {
    minimize: false,
    timestamps: { currentTime: () => Date.now() }
  });

  // schema.set('toJSON', {
  //   virtuals: true,
  //   versionKey: false,
  //   transform: function (doc, ret) {
  //     delete ret._id;
  //     delete ret.hash;
  //   }
  // });

  return mongoose.model('Product', schema);
}