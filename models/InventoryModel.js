const mongoose = require('mongoose')

const InventorySchema = mongoose.Schema(
    {
        nama: {
            type: String,
            required: [true, "Masukkan nama Barang"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamp: true
    }
)

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;