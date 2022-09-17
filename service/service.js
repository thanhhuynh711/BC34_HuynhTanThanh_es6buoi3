const ServiceAPI = {
  getTask: () => {
    return axios.get("https://6301cf979a1035c7f8073dd8.mockapi.io/api/es6B3");
  },
  postTask: (Tdo) => {
    return axios.post(
      "https://6301cf979a1035c7f8073dd8.mockapi.io/api/es6B3",
      Tdo
    );
  },
  deleteTask: (id) => {
    return axios.delete(
      `https://6301cf979a1035c7f8073dd8.mockapi.io/api/es6B3/${id}`
    );
  },
  updateTask: (tdo) => {
    return axios({
      url: `https://6301cf979a1035c7f8073dd8.mockapi.io/api/es6B3/${tdo.id}`,
      method: "PUT",
      data: tdo,
    });
  },
};
export default ServiceAPI;
