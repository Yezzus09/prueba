const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'El nombre es obligatorio'],
        trim: true,
        unique:true

    },
    description:{
        type: String,
        required:[true,'la descripcion es obligatoria'],
        trim:true,
    },
    price:{
        type: Number,
        required:[true,'el precio es obligatorio'],
        min:[0,'El precion no puede ser negativo']
    },
    stock:{
        type: Number,
        required:[true,'El stock es requerido'],
        min:[0,'El stock no puede ser negativo']
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true, 'la categoria es requerida']
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategory',
        required:[true,'la subcategoria es requerida']
    },
    images:[{
        type:String
    }]
},{
    timestamps:true,
    versionKey:false
});

//manejo de errores de duplicados

productSchema.post('save', function(error, doc, next){
    if(error.name === 'MongoServerError' && error.code === 11000){
        next(new Error('ya existe un producto con ese nombre'));
    } else{
        next(error)
    }
});

module.exports = mongoose.model('product', productSchema);