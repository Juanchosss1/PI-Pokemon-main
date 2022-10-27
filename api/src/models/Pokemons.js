const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemons",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      life: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      img: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://vader.news/__export/1588965166057/sites/gadgets/img/2020/05/08/2-25193_pokemon-ball-transparent-background-transparent-background-pokeball-png.png_423682103.png",
        validate: {
          isUrl: true,
        },
      },
      createDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
