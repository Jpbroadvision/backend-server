const Events = require("../../models/Events");

module.exports = (req, res) => {
  if (!req.user) return res.status(403).send("Not Logged In.");
  if (!req.params.id) return res.status(400).send("Not All Parameters Provided.");

  Events.findOne(
    {
      where:
      {
        id: req.params.id,
      },
    },
  )
    .then((eventData) => {
      User.findOne(
        {
          where:
          {
            id: req.user.id,
          },
        },
      )
        .then((userData) => {
          userData
            .addEvents(eventData)
            .then(() => res.json(
              {
                name: eventData.name,
                location: eventData.location,
                description: eventData.description,
                host: eventData.host,
                eventImage: eventData.eventImage,
                status: eventData.status,
                date: eventData.date,
              },
            ))
            .catch((error) => {
              console.log(error);
              return res.status(500).send("Internal Server Error.");
            });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send("Internal Server Error.");
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
