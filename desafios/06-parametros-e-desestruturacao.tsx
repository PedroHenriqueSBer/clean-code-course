function updateUserRoute(body, params) {
  const { password, name, email } = body;
  const { id } = params;

  updateUserController({
    data: { password, name, email },
    params: { id },
  });
}

function updateUserController({ data, params }) {
  const { password, name, email } = data;
  const { id } = params;

  userRepository.update({
    data: { password, name, email },
    params: { id },
  });
}

const userRepository = {
  update: ({ data, params }) => {},
};
