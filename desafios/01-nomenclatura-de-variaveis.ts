// Nomenclatura de variáveis

const usersCategory = [
  {
    title: "User",
    followers: 5,
  },
  {
    title: "Friendly",
    followers: 50,
  },
  {
    title: "Famous",
    followers: 500,
  },
  {
    title: "Super Star",
    followers: 1000,
  },
];

export default async function getCategoryByUsername(
  githubUsername: string,
  apiResponse
) {
  if (!githubUsername) {
    return apiResponse.status(400).json({
      message: `Please provide an username to search on the github API`,
    });
  }

  const searchedUser = await fetch(
    `https://api.github.com/users/${githubUsername}`
  );

  if (searchedUser.status === 404) {
    return apiResponse.status(400).json({
      message: `User with username "${githubUsername}" not found`,
    });
  }

  const user = await searchedUser.json();

  const usersCategoryByFollowersOrder = usersCategory.sort(
    (userCategoryA, userCategoryB) =>
      userCategoryB.followers - userCategoryA.followers
  );

  const userCategory = usersCategoryByFollowersOrder.find(
    (userCategory) => user.followers > userCategory.followers
  );

  if (!userCategory) return;

  const result = {
    githubUsername,
    category: userCategory.title,
  };

  return result;
}

getCategoryByUsername("josepholiveira", {});
