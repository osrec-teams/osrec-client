import axios from 'axios';
import { normalize } from 'normalizr';

import URL_API from '../api';

import { chatroomsSchema, chatroomsListSchema } from './schemas';
import {
  chatroomsCreateRequest,
  chatroomsCreateFailure,
  chatroomsCreateSuccess,
  chatroomsFetchRequest,
  chatroomsFetchFailure,
  chatroomsFetchSuccess,
} from './creators';

export const fetchChatrooms = () => dispatch =>
  new Promise((resolve, reject) => {
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
    };

    dispatch(chatroomsFetchRequest());
    axios
      .get(`${URL_API}/chatrooms`, axiosConfig)
      .then(({ data }) => {
        const { chatrooms } = normalize(
          data.map(chatroom => ({ ...chatroom, messages: [] })),
          chatroomsListSchema,
        ).entities;
        dispatch(chatroomsFetchSuccess(chatrooms));
        resolve();
      })
      .catch(e => {
        dispatch(chatroomsFetchFailure(e));
        reject();
      });
  });

export const fetchChatroom = room => dispatch =>
  new Promise((resolve, reject) => {
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
    };

    dispatch(chatroomsFetchRequest());
    axios
      .get(`${URL_API}/chatrooms/${room}`, axiosConfig)
      .then(({ data }) => {
        const { chatrooms } = normalize(
          { ...data, messages: [] },
          chatroomsSchema,
        ).entities;
        dispatch(chatroomsFetchSuccess(chatrooms));
        resolve();
      })
      .catch(e => {
        dispatch(chatroomsFetchFailure(e));
        reject();
      });
  });

export const createChatroom = chatroom => dispatch =>
  new Promise((resolve, reject) => {
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
    };

    dispatch(chatroomsCreateRequest());
    axios
      .post(`${URL_API}/chatrooms`, chatroom, axiosConfig)
      .then(() => {
        dispatch(chatroomsCreateSuccess());
        resolve();
      })
      .catch(e => {
        dispatch(chatroomsCreateFailure(e));
        reject();
      });
  });
