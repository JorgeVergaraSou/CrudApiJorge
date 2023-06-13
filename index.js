const BASE_URL = "https://647a6c1bd2e5b6101db05747.mockapi.io/users";

//INICIO MODAL NUEVO USUARIO
const form = document.getElementById("formModal");
form.addEventListener("submit", handleSubmit);
function handleSubmit() {
  const user = new FormData(form);
  const newUser = {
    name: user.get("fullName"),
    email: user.get("email"),
    phone: user.get("phone"),
  };
  console.log(newUser);
  addOne(newUser);
}
//FIN MODAL NUEVO USUARIO
const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", () => {
  modal.close();
});
openModal.addEventListener("click", () => {
  modal.showModal();
});


//get all resources
function getAll(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.forEach(dato => {
        const nuevaFila = document.createElement("tr");

        const celdaIdentificador = document.createElement("td");
        const celdaNombre = document.createElement("td");
        const celdaEmail = document.createElement("td");
        const celdaPhone = document.createElement("td");
        const btnUpdate = document.createElement("td");
        const btnDelete = document.createElement("td");
        //INICIO CREAR ELEMENTO INPUT
        const inputNombre = document.createElement("input");
        const inputEmail = document.createElement("input");
        const inputPhone = document.createElement("input");
        //FIN CREAR ELEMENTO INPUT



        // Crear el elemento del botón
        const buttonElementUpdate = document.createElement('button');
        const buttonElementDelete = document.createElement('button');
        // Asignar un id al botón
        buttonElementUpdate.id = dato.id;
        buttonElementUpdate.value = dato.id;
        buttonElementUpdate.className = 'updater';

        buttonElementDelete.id = dato.id;
        buttonElementDelete.value = dato.id;
        buttonElementDelete.className = 'deleter';
        // Agregar texto al botón
        buttonElementUpdate.textContent = 'UPDATE';
        buttonElementDelete.textContent = 'DELETE';

        //llenado de los input con la DATA
        celdaIdentificador.innerText = dato.id;

        inputNombre.id = 'name_' + dato.id;
        inputNombre.value = dato.name;
        inputEmail.id = 'email_' + dato.id;
        inputEmail.value = dato.email;
        inputPhone.id = 'phone_' + dato.id;
        inputPhone.value = dato.phone;

        //



        // INICIO AGREGANDO AL DOM
        celdaNombre.appendChild(inputNombre);
        celdaEmail.appendChild(inputEmail);
        celdaPhone.appendChild(inputPhone);

        btnUpdate.appendChild(buttonElementUpdate);
        btnDelete.appendChild(buttonElementDelete);

        nuevaFila.appendChild(celdaIdentificador);
        nuevaFila.appendChild(celdaNombre);
        nuevaFila.appendChild(celdaEmail);
        nuevaFila.appendChild(celdaPhone);
        nuevaFila.appendChild(btnUpdate);
        nuevaFila.appendChild(btnDelete);
        miTabla.appendChild(nuevaFila);
        // FIN AGREGANDO AL DOM
      })
      console.log(data)
    }
    )
    .catch(err => console.error(err));
}
getAll(BASE_URL);

document.addEventListener('click', (e) => {
  const idDato = e.target.id;
  const clasa = e.target.className;
  if (clasa == 'updater') {
    console.log(idDato);
    const getName = document.getElementById('name_' + idDato);
    const valorName = getName.value;
    const getEmail = document.getElementById('email_' + idDato);
    const valorEmail = getEmail.value;
    const getPhone = document.getElementById('phone_' + idDato);
    const valorPhone = getPhone.value;

    console.log(valorName);
    console.log(valorEmail);
    console.log(valorPhone);

    const updateUser = {
      name: valorName,
      email: valorEmail,
      phone: valorPhone,
    };

    updateOne(idDato, updateUser);

  } else if (clasa == 'deleter') {
    deleteOne(idDato)
  }

});

//get resource by id
function getOne(id) {
  fetch(BASE_URL + `/${id}`)
    .then(res => res.json())
    .then(data => {


      console.log(data)

    })
    .catch(err => console.error(err));
}

//INICIO delete one
function deleteOne(id) {
  fetch(BASE_URL + `/${id}`, {
    method: "DELETE",
  })
    .then(res => res.json())
    .then(data => {
      if (window.confirm("Desea eliminar el usuario?")) {
        alert("Usuario eliminado con exito!");
        location.reload();
      } else { alert("CANCELADO!"); }
    })
    .catch(err => console.error(err));
}
//FIN delete one

//INICIO AGREGAR 1 REGISTRO
function addOne(user) {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      alert('Usuario agregado con Éxito');
      location.reload();
    })
    .catch(err => console.error(err));
}
//FIN AGREGAR 1 REGISTRO

function updateOne(id, user) {
  fetch(BASE_URL + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      alert('Usuario actualizado con Éxito');
      location.reload();
    })
    .catch(err => console.error(err));
}