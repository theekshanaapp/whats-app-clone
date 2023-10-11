import Vue from "vue";
import Vuex from "vuex";

import { db } from '../firebase';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    rooms: []
  },
  mutations: {
    setCurrentUser (state, payload) {
      state.currentUser = payload;
    },
    updateRooms(state, rooms) {
      state.rooms = rooms;
    }
  },
  getters: {
    roomArr: state => state.rooms.map(r => r.name)
  },
  actions: {
    allRooms: async ({ commit }) => {
      try {
        const usersCollection = db.collection('group');
        const querySnapshot = await usersCollection.get();
  
        const allUsers = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            allUsers.push(userData);
          }
        });
  
        commit('updateRooms', allUsers);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    },
    async addUser({ dispatch }, name) {
      try {
        const collectionRef = db.collection('group');
        // Check if a group with the same name already exists
        const existingGroupQuery = await collectionRef.where('name', '==', name).get();

        if (existingGroupQuery.empty) {
          
          await collectionRef.add({
            name: name,
            messages: [],
            updateDate: new Date()
          });
          await dispatch('allRooms');
          console.log('User added successfully!');

        } else {
          // If a group with the same name already exists, handle the validation error
          console.error('A group with the same name already exists.');
        }
        
      } catch (error) {
        console.error('Error adding user: ', error);
      }
    },
    async updateRoomMessages({ commit, state }, { roomName, pushMessages }) {
      try {
        const roomToUpdate = state.rooms.find((room) => room.name === roomName);

        if (roomToUpdate) {

          const roomRef1 = db.collection('group').where('name', '==', roomToUpdate.name);
          const querySnapshot = await roomRef1.get();

          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              const currentMessages = doc.data().messages || [];
              currentMessages.push(pushMessages);

              const updatedData = {
                messages: currentMessages,
              };

              await doc.ref.update(updatedData);
              console.log('Room updated successfully!');
            });
          }
          // Commit the updated allRooms array to the state
          commit('updateRooms', [...state.rooms]);
        } else {
          console.error('Room not found.');
        }
      } catch (error) {
        console.error('Error updating room messages:', error);
      }
    }
  },
  modules: {
  }
});
