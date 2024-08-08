const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const generateUniqueId = require("generate-unique-id");

app.use(bodyParser.json());
app.use(cors());

// app.get("/isalive", (req, res) => {
//   res.status(200).json({
//     isAlive: true,
//   });
// });

//external variables used in the listeners
const list = petList();

function getSinglePet(currentId) {
  const pet = list.filter((animal) => {
    return animal.id == currentId;
  });
  return pet;
}

// function addOrUpdate(currentId, updatedPet) {
//   const returningArray = getSinglePet(currentId);
//   if (returningArray.length === 0) {
//     list.push(updatedPet);
//     console.log("added new ", list);
//   } else {
//     returningArray[0].petName = updatedPet.petName;
//     returningArray[0].type = updatedPet.type;
//     returningArray[0].gender = updatedPet.gender;
//     returningArray[0].born = updatedPet.born;
//     returningArray[0].underTreatmentFrom = updatedPet.underTreatmentFrom;
//     returningArray[0].chronicDiseases = updatedPet.chronicDiseases;
//     returningArray[0].medicines = updatedPet.medicines;
//     returningArray[0].operations = updatedPet.operations;
//     returningArray[0].ownerName = updatedPet.ownerName;
//     returningArray[0].animalShelter = updatedPet.animalShelter;
//     returningArray[0].nutrition = updatedPet.nutrition;
//     console.log("updating ", list);
//   }
//   return list;
// }

function findElementIndex(petId) {
  const index = list.findIndex((animal) => {
    return animal.id === petId;
  });
  return index;
}

function addNewAnimalToList(pet) {
  const newId = generateUniqueId();
  pet.id = newId;
  list.push(pet);
  return pet;
}

function addOrUpdateAnimal(pet, petId) {
  const index = findElementIndex(petId);

  if (index === -1) {
    addNewAnimalToList(pet);
    console.log("added new ", list);
  } else {
    list[index] = pet;
    console.log("updating ", list);
  }
  return list;
}


////////////////////////////////////////////////

// get list of pets from http://localhost:2000/list
app.get("/list", (req, res) => {
  res.send(list);
});

// get single pet from http://localhost:2000/single/${id}
app.get("/single/:id", function (req, res) {
  const petId = req.params.id;
  // console.log("ID ", petId);
  const singlePet = getSinglePet(petId);

  res.send({ name: "get-single-pet", result: singlePet });
});

// add new pet
app.post("/save", function (req, res) {
  try {
    const newPet = req.body;
    const petToAdd = addNewAnimalToList(newPet);
    console.log(list);
    res.status(200).json(petToAdd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Failed to save a pet` });
  }
});

//add new or update existing
app.put("/update/:id", function (req, res) {
  try {
    const petId = req.params.id;
    const pet = req.body;
    //   addOrUpdate(petId, updatedPet);
    addOrUpdateAnimal(pet, petId);
    console.log(list);
    res.status(200).json(pet);

    //   res.send({ name: "put", status: "PUT succeeded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Failed to update a pet` });
  }
});

//delete
app.delete("/delete/:id", function (req, res) {
  try {
    const petId = req.params.id;
    const currentIndex = findElementIndex(petId);
    list.splice(currentIndex, 1);
    return res.send({ result: "Pet was deleted" }); //f90u8yq9l4agmn0kvc6c
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Failed to delete a pet` });
  }
});

// console.log(list);

function petList() {
  return [
    {
      petName: "Barsik",
      type: "cat",
      gender: "m",
      born: "2020",
      underTreatmentFrom: "2020",
      chronicDiseases: "none",
      medicines: "none",
      operations: "no",
      ownerName: "Julia",
      animalShelter: "no",
      nutrition: "regular",
      id: "slf8gxd2n8ld5arigphw",
    },
    {
      petName: "Sharik",
      type: "dog",
      gender: "m",
      born: "2010",
      underTreatmentFrom: "2020",
      chronicDiseases: "diabetes",
      medicines: "insulin",
      operations: "no",
      ownerName: "Maxim",
      animalShelter: "yes",
      nutrition: "special",
      id: "nx6vt76s1c7ongzir2rh",
    },
    {
      petName: "Homka",
      type: "hamster",
      gender: "f",
      born: "2022",
      underTreatmentFrom: "2022",
      chronicDiseases: "none",
      medicines: "none",
      operations: "yes",
      ownerName: "Vasya",
      animalShelter: "no",
      nutrition: "regular",
      id: "yde74usdllfoaubr0w1d",
    },
    {
      petName: "Piggy",
      type: "dwarf pig",
      gender: "f",
      born: "2021",
      underTreatmentFrom: "2022",
      chronicDiseases: "none",
      medicines: "none",
      operations: "no",
      ownerName: "Vika",
      animalShelter: "no",
      nutrition: "human food",
      id: "upf7tig4grul2l38seu7",
    },
    {
        "petName": "Maggi",
        "type": "rabbit",
        "gender": "f",
        "born": "2022",
        "underTreatmentFrom": "2022",
        "chronicDiseases": "none",
        "medicines": "no",
        "operations": "no",
        "ownerName": "Vika",
        "animalShelter": "no",
        "nutrition": "regular",
        "id": "w0x9yeywk6pb5s7ivu1g"
    }
  ];
}

app.listen(2000, function () {
  console.log("Server started on port 2000");
});
