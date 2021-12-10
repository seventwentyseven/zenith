main = "275"
module.exports = {
    purge: [
      "../templates/**/*.html"
    ],
    darkMode: 'class',
    theme: {
      extend: {
        fontSize: {
          '2xs': '10px',
        },
        borderWidth: {
            '3': '3px',
        },
        width: {
          '5.4/12': '45%',
          '5.7/12': '47.5%',
        },
        height: {
          '34': '136px'
        },
        fontFamily: {
          'display': ['Comfortaa'],
        },
        maxWidth: {
          'sxs': '120px'
        },
        colors: {
          'hsl': {
            '5': 'hsl('+ main +', 5%, 5%)',
            '10': 'hsl('+ main +', 10%, 10%)',
            '15': 'hsl('+ main +', 15%, 15%)',
            '20': 'hsl('+ main +', 20%, 20%)',
            '25': 'hsl('+ main +', 25%, 25%)',
            '30': 'hsl('+ main +', 30%, 30%)',
            '35': 'hsl('+ main +', 35%, 35%)',
            '40': 'hsl('+ main +', 40%, 40%)',
            '45': 'hsl('+ main +', 45%, 45%)',
            '50': 'hsl('+ main +', 50%, 50%)',
            '55': 'hsl('+ main +', 55%, 55%)',
            '60': 'hsl('+ main +', 60%, 60%)',
            '65': 'hsl('+ main +', 65%, 65%)',
            '70': 'hsl('+ main +', 70%, 70%)',
            '75': 'hsl('+ main +', 75%, 75%)',
            '80': 'hsl('+ main +', 80%, 80%)',

            '30-15': 'hsl('+ main +', 30%, 15%)',
            '25-30': 'hsl('+ main +', 25%, 30%)',
            '25-10': 'hsl('+ main +', 25%, 10%)',
            '15-25': 'hsl('+ main +', 15%, 25%)',
            '15-20': 'hsl('+ main +', 15%, 20%)',
            '15-25': 'hsl('+ main +', 15%, 25%)',
            '15-10': 'hsl('+ main +', 15%, 10%)',
            '10-30': 'hsl('+ main +', 10%, 30%)',
            '10-25': 'hsl('+ main +', 10%, 25%)',
            '10-20': 'hsl('+ main +', 10%, 20%)',
            '10-15': 'hsl('+ main +', 10%, 15%)',
          }
        }
      },
    },
    variants: {
      extend: {
      },
    },
    plugins: [],
  }