import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createPokemon, getAllPokemons, getTypes } from "../../redux/actions";
import styles from "../CreatePokemon/CreatePokemon.module.css";
function onlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
}
function validUrl(value) {
  return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
    value
  );
}
const CreatePokemon = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }, [dispatch]);

  console.log(pokemons);

  const [input, setInput] = useState({
    name: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    img: "",
    types: [],
  });

  const [errors, setErrors] = useState({});

  function validateForm(input) {
    let errors = {};
    if (onlyLettersAndSpaces(input.name) !== true) {
      errors.name = `The name only accepts letters`;
    }
    if (!input.name) {
      errors.name = `You should enter a name to create a pokemon`;
    }
    if (typeof input.name !== "string")
      if (pokemons.find((n) => n.name === input.name.toLowerCase())) {
        errors.name = `The name "${input.name}" it´s already used, try another one`;
      }
    if (!input.life) {
      errors.life = `You should enter a value in life to create a pokemon`;
    }
    if (input.life.length ? input.life < 0 : input.life === 0) {
      errors.life = `Life must be greater than 0`;
    } else if (input.life > 999) {
      errors.life = `Life must be lesser than 1000`;
    }
    if (!input.attack) {
      errors.attack = `You should enter a value in attack to create a pokemon`;
    }
    if (input.attack.length ? input.attack < 0 : input.attack === 0) {
      errors.attack = `Attack must be greater than 0`;
    } else if (input.attack > 999) {
      errors.life = `Attack must be lesser than 1000`;
    }
    if (!input.defense) {
      errors.attack = `You should enter a value in defense to create a pokemon`;
    }
    if (input.defense.length ? input.defense < 0 : input.defense === 0) {
      errors.defense = `Defense must be greater than 0`;
    } else if (input.defense > 999) {
      errors.defense = `Defense must be lesser than 1000`;
    }
    if (!input.speed) {
      errors.speed = `You should enter a value in speed to create a pokemon`;
    }
    if (input.speed.length ? input.speed < 0 : (input.speed = 0)) {
      errors.speed = `Speed must be greater than 0`;
    } else if (input.speed > 999) {
      errors.speed = `Speed must be lesser than 1000`;
    }
    if (!input.height) {
      errors.height = `You should enter a value in height to create a pokemon`;
    }
    if (input.height.length ? input.height < 0 : (input.height = 0)) {
      errors.height = `Height must be greater than 0`;
    } else if (input.height > 999) {
      errors.height = `Height must be lesser than 1000`;
    }
    if (!input.weight) {
      errors.weight = `You should enter a value in weight to create a pokemon`;
    }
    if (input.weight.length ? input.weight < 0 : (input.weight = 0)) {
      errors.weight = `Weight must be greater than 0`;
    } else if (input.weight > 999) {
      errors.weight = `Weight must be lesser than 1000`;
    }
    if (input.img.length && validUrl(input.img) !== true) {
      errors.img = `You must enter a valid URL`;
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    let checked = e.target.checked;
    if (checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    if (!checked) {
      setInput({
        ...input,
        types: input.types.filter((t) => t !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(createPokemon(input));
      setInput({
        name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        weight: "",
        height: "",
        img: "",
        types: [],
      });
      alert("Pokemon created successfully");
      history.push("/home");
    } else {
      alert(`You must complete the form correctly`);
    }
  }

  return (
    <div>
      <NavLink to="/home">
        <i className={styles.arrowLeft}></i>
      </NavLink>

      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1>Create Pokemon</h1>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Image: </label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Life: </label>
          <input
            type="number"
            value={input.life}
            name="life"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Attack: </label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Defense: </label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Speed: </label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Height: </label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Weight: </label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.checkbox}>
            <label>Type: </label>

            {types.length !== 0 ? (
              types.map((t) => {
                return (
                  <div>
                    <label key={t.id}>
                      <input
                        type="checkbox"
                        value={t.name}
                        name={t.name}
                        onChange={(e) => handleCheck(e)}
                      />

                      {t.name}
                    </label>
                  </div>
                );
              })
            ) : (
              <option>Loading types</option>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || !input.name}
        >
          <label className={styles.send}>Send! </label>
        </button>
        <div className={styles.error}>
          {errors.name && <p>{errors.name}</p>}
          {errors.img && <p>{errors.img}</p>}
          {errors.life && <p>{errors.life}</p>}
          {errors.attack && <p>{errors.attack}</p>}
          {errors.defense && <p>{errors.defense}</p>}
          {errors.speed && <p>{errors.speed}</p>}
          {errors.height && <p>{errors.height}</p>}
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <br />
        <a href="https://replicate.com/lambdal/text-to-pokemon" target="_blanc">
          INSPIRATION
        </a>
      </form>
    </div>
  );
};

export default CreatePokemon;
