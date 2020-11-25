const {Router} = require('express')

const Usuario = require('../models/usuarios.model')
const router = Router()

const axios = require('axios')

const eventUrl = 'http://event-bus-clusterip-srv:3003/api/event-bus/event'

/**
 *
 */
router.get('/api/usuarios', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const lista = await Usuario.findAll({
    attributes: ['id', 'nombre', 'cedula']
  })

  res.send({
    message: 'Lista de usuarios',
    data: lista
  })
})

/**
 * crear usuario
 */
router.post('/api/usuarios', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})


  try {
    const {nombre, cedula} = req.body

    const user = await Usuario.create({
      nombre, cedula
    })


    emitEvent('userCreated',user.get('id') )

    res.status(201).send({
      message: 'Usuario Creado',
      data: user
    })
  } catch (err) {

    if (err.message === 'Validation error') {
      return res.status(401).send({
        message: 'Cedula ya registrada',

      })
    }
    res.status(500).send({
      message: 'Ocurrio un error inexperado',

    })
  }
})

/**
 *
 */
router.get('/api/usuarios/:id', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const lista = await Usuario.findOne({
    where: {
      cedula: id
    }
  })

  res.send({
    message: 'Usuario',
    data: lista
  })
})

/**
 *
 */
router.delete('/api/usuarios/:id', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const user = await Usuario.findOne({
    where: {
      cedula: id
    }
  })

  if (!user) {
    res.status(404).send({
      message: 'Usuario no existe',
      data: null
    })
  }

  const lista = await Usuario.destroy({
    where: {
      cedula: id
    }
  })

  emitEvent('userDeleted', user.get('id'))


  res.send({
    message: 'Usuario eliminado',
    data: lista
  })
})


router.post('/api/event', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})
  let {event} = req.body

  console.log(event)
})


function emitEvent(type, data) {
  axios.post(eventUrl,
    {
      event: {
        type,
        data
      }

    })
}


module.exports = router