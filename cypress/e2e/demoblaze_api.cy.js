describe('Pruebas de API REST - Demoblaze (Signup & Login)', () => {
  const baseUrl = 'https://api.demoblaze.com';
  
  // Generamos un usuario dinámico para evitar colisiones en múltiples ejecuciones
  const dynamicUser = `qa_user_${Date.now()}`;
  const password = 'SecurePassword123!';
  
  // Usuario estático para pruebas de fallo
  const existingUser = 'admin'; 

  it('1. Crear un nuevo usuario en signup', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/signup`,
      body: {
        username: dynamicUser,
        password: password
      }
    }).then((response) => {
      // Demoblaze devuelve 200 y body vacío "" al crear exitosamente
      expect(response.status).to.eq(200);
      expect(response.body).to.be.empty;
    });
  });

  it('2. Intentar crear un usuario ya existente', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/signup`,
      body: {
        username: existingUser,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Validamos que capture la salida del error en el JSON
      expect(response.body.errorMessage).to.eq('This user already exist.');
    });
  });

  it('3. Usuario y password correcto en login (usando el dinámico creado)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      body: {
        username: dynamicUser,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Al loguearse exitosamente, devuelve un token tipo "Auth_token: xyz"
      expect(response.body).to.include('Auth_token');
    });
  });

  it('4. Usuario y password incorrecto en login', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      body: {
        username: dynamicUser,
        password: 'WrongPassword!'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errorMessage).to.eq('Wrong password.');
    });
  });
});