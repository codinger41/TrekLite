import PubNub from 'pubnub'

const pubnub: any = new PubNub({
  publishKey: '<INSERT PUBLISH KEY>',
  subscribeKey: '<INSERT SUBSCRIBE KEY>',
  subscribeRequestTimeout: 60000,
  presenceTimeout: 122
})

export default pubnub
