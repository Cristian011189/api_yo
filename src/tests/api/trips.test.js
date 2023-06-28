import request from "supertest";
import app from "../../app";
import usersController from "../../controllers/users.controller";
import { createConnection } from "mysql2/promise";

describe("Pruebas sobre la API", () => {
  let connection;

  describe("GET /api/users", () => {
    let response;

    beforeEach(async () => {
      // Simular la respuesta utilizando supertest
      response = await request(app).get("/api/users");
    });

    it("La ruta funciona", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    });

    it("La petición nos devuelve un array de usuarios", () => {
      expect(response.body).toBeInstanceOf(Array);
    });

    it("La petición devuelve todos los usuarios", async () => {
      // Obtener los usuarios utilizando el controlador
      const usersResponse = await request(app).get("/api/users");
      const users = usersResponse.body;

      expect(response.body.length).toEqual(users.length);
    });

    afterAll(async () => {
      // Cerrar la conexión a la base de datos
      if (connection) {
        await connection.end();
      }
    });
  });
});
