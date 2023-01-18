<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input 
    bottom-slots 
    v-model="newTweetContent"
    class="new-tweet" 
    label="What's happening?" 
    counter 
    maxlength="280"
    autogrow
    >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>
      </q-input></div>
      <div class="col col-shrink ">
        <q-btn @click="addNewTweet" class="q-mb-lg" unelevated rounded :disable="!newTweetContent" color="primary" label="Tweet" no-caps  />
      </div>
    </div>

    <q-separator class="divider" size="5px" color="grey-2" />

    <q-list seperator>
      <transition-group
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow">
          <q-item 
          class="tweet q-py-md"
          v-for="tweet in tweets"
          :key="tweet.id"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Lorem ipsum</strong>
                <span class="text-grey-7">
                  @lorem_ipsum
                  <br class="lt-md"> &bull; {{ tweet.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="qtweet-content text-body1">
                {{tweet.content}}
              </q-item-label>
            
              <div class="tweet-icons row justify-between q-mt-sm">
                <q-btn flat round color="grey" icon="far fa-comment" size="sm" />

                <q-btn flat round color="grey" icon="fas fa-retweet" size="sm" />

                <q-btn 
                flat 
                round 
                @click="toggleLiked(tweet)"
                :color="tweet.liked ? 'pink' : 'grey'"
                :icon="tweet.liked  ? 'fas fa-heart' : 'far fa-heart' " 
                size="sm" />
                <q-btn @click="deleteTweet(tweet)" flat round color="grey" icon="fas fa-trash" size="sm" />
              </div>

            </q-item-section>
          </q-item>
      </transition-group>
    </q-list>
  </q-page>
</template>

<script>
import { formatDistance, subDays } from 'date-fns'
import { defineComponent } from 'vue'
import db from 'src/boot/firebase'
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newTweetContent: '',
      tweets:[
        // {
        //   content: 'Hello there sir whats going on in the world hehehehhe',
        //   date: 1674006625485
        // },
        // {
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, aut officiis dolores sequi facilis similique veniam nulla ad? Autem consectetur ex numquam voluptatum repellendus beatae sed cum? Praesentium, error repellat?',
        //   date: 1674006641663 
        // }
    ]
    }
  },
  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date(), { addSuffix: true })
    },
    async addNewTweet() {
      let newTweet = {
      content: this.newTweetContent,
      date: Date.now(),
      liked: false
    }
    // this.tweets.unshift(newTweet)
    const docRef = await addDoc(collection(db, "tweets"), newTweet);
      console.log("Document written with ID: ", docRef.id);
    this.newTweetContent = ""
  },
    async deleteTweet(tweet) {
      // let dateToDelete = tweet.date
      // let index = this.tweets.findIndex(tweet => tweet.date === dateToDelete)
      // this.tweets.splice(index, 1)
      await deleteDoc(doc(db, "tweets", tweet.id));
    },
    async toggleLiked(tweet) {
      const washingtonRef = doc(db, "tweets", tweet.id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        liked: !tweet.liked
      });
    }
  },
  mounted() {
    const q = query(collection(db, "tweets"),orderBy("date"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let tweetChange = change.doc.data()
        tweetChange.id = change.doc.id
        if (change.type === "added") {
            console.log("New tweet: ", tweetChange);
            this.tweets.unshift(tweetChange)
        }
        if (change.type === "modified") {
            console.log("Modified tweet: ", tweetChange);
            let index= this.tweets.findIndex(tweet => tweet.id === tweetChange.id)
            Object.assign(this.tweets[index], tweetChange)
        }
        if (change.type === "removed") {
            console.log("Removed tweet: ", tweetChange);
            let index= this.tweets.findIndex(tweet => tweet.id === tweetChange.id)
            this.tweets.splice(index, 1)
        }
      });
    });
  }

})
</script>

<style lang="sass">
  .new-tweet
      textarea
        font-size: 19px
        line-height: 1.4 !important
  .divider 
  // border-top: 1px solid
    border-color: grey-4
  .qtweet-content
    white-space: pre-line
  .tweet-icons
    margin-left: -5px
  .tweet:not(:first-child)
    border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>