import axios from 'axios'

export default {
  async getCaptcha (key) {
    const imageBuffer = await axios.get('/captcha?key=' + key, {
      responseType: 'arraybuffer'
    })
    let image = btoa(
      new Uint8Array(imageBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )
    return `data:image/png;base64,${image}`
  },
  checkCaptcha (key, code) {
    return axios.get('/captcha/check?key=' + key + '&code=' + code)
  }
}
