// authService.js
export const loginRequest = async (username, password) => {
  const response = await fetch("http://localhost:4000/users");
  const data = await response.json();

  const user = data.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) throw new Error("Credenciales incorrectas");

  return {
    token: user.token,
    userid: user.id,
    username: user.username,
    expiration: new Date(Date.now() + 3600 * 1000).toISOString()
  };
};


export const registerRequest = async (username, password) => {
  const response = await fetch("http://localhost:4000/users");
  const users = await response.json();

  const exists = users.find((u) => u.username === username);
  if (exists) throw new Error("El usuario ya existe");

  const newUser = {
    id: users.length + 1,
    username,
    password,
    token: Math.random().toString(36).substring(2) // token aleatorio para pruebas
  };

  const res = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  if (!res.ok) throw new Error("No se pudo registrar el usuario");

  return await res.json();
};
