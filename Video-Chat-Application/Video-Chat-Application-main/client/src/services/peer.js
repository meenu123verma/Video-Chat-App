class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
            ],
          },
        ],
      });
    }
  }
  async getAnswer(offer) {
    if(this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer;
    }
  }
  async setLocalDescription(ans){
    if(this.peer){
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }

  }
  async getOffer() {
    if(this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
    }
  }
}
const peerService = new PeerService();

export default peerService;