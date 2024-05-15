export const shuffle = (users) => {
  for (let i = 0; i < users.length; i++) {
    const temp = users[i]
    const j = Math.floor(Math.random() * users.length)
    users[i] = users[j]
    users[j] = temp
  }
}