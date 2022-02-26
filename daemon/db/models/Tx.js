module.exports = (sequelize, DataTypes) => {
    const tx = sequelize.define("Tx", {
        block_hash:{
            type: DataTypes.STRING(255),
            comment: "Block Hash",
            allowNull: false
        },
        block_height:{
            type: DataTypes.INTEGER
        },
        fee_rate: {
            type: DataTypes.STRING(255)
        },
        sender_address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        tx_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        tx_index: {
            type: DataTypes.INTEGER
        },
        tx_status: {
            type: DataTypes.STRING(20)
        },
        tx_type: {
            type: DataTypes.STRING(30)
        },
        content: {
            type: DataTypes.JSON
        }
    }, {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "txs",
        timestamps: true
    });

    tx.associate = function (models) {
        models.Tx.belongsTo(models.Block, {
            foreignKey: 'f_hash',
            targetKey: 'hash',
            onDelete: 'cascade'
        });
    };

    return tx;
}