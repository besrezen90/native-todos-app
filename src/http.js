export class HTTP {
  static async get(url) {
    try {
      return await request(url);
    } catch (error) {
      throw error;
    }
  }
  static async post(url, data) {
    try {
      return await request(url, "post", data);
    } catch (error) {
      throw error;
    }
  }
  static async patch(url, data) {
    try {
      return await request(url, "patch", data);
    } catch (error) {
      throw error;
    }
  }
  static async delete(url) {
    try {
      return await request(url, "delete");
    } catch (error) {
      throw error;
    }
  }
}

async function request(url, method = "get", data) {
  const config = {
    method,
    headers: { "Content-Type": "applications/json" }
  };

  if (method === "post" || method === "patch") {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  return response.json();
}
