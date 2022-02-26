module.exports = (sequelize, DataTypes) => {
    const block = sequelize.define("Block", {
        hash:{
            type: DataTypes.STRING(255),
            comment: "Block Hash",
            primaryKey: true,
            allowNull: false
        },
        tx_count:{
            type: DataTypes.INTEGER
        },
        height: {
            type: DataTypes.INTEGER
        },
        miner_txid: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        time: {
            type: DataTypes.INTEGER
        }
    }, {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "blocks",
        timestamps: true
    });

    block.associate = function (models) {
        models.Block.hasMany(models.Tx, {
          foreignKey: 'f_hash',
          sourceKey: 'hash',
          onDelete: 'cascade',
        });
    };

    return block;
}