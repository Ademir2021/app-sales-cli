const bcrypt =  require('bcryptjs')

const password = 'oe3im3io2r3o2'
//const rounds = 10

const hashPassword = async () => {
  const hash = await bcrypt.hash(password, 10)
  console.log(hash)
  console.log(await bcrypt.compare(password, hash))
}

hashPassword()