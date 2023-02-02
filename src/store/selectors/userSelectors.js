import { createSelector } from "@reduxjs/toolkit";

export const selectUserLoadingState = ({ user }) => user.loadingState;

export const selectSearchLoadingState = ({ user }) => user.searchLoadingState;

export const selectUserNameAndEmail = ({ user }) => ({
  userName: user.user.userName,
  email: user.user.email,
});

const selectedUserInfo = ({ user }) => ({
  _id: user.user?._id,
  birthDate: user.user?.birthDate,
  from: {
    country: user.user?.from?.country,
    city: user.user?.from?.city,
  },
  currentLivingPlace: {
    country: user.user?.currentLivingPlace?.country,
    city: user.user?.currentLivingPlace?.city,
  },
  workplace: {
    institution: user.user?.currentWorkplace?.institution,
    position: user.user?.currentWorkplace?.position,
  },
  friendsAmount: user.user.friendsAmount,
  friends: user.user.friends,
  createdAt: user.user?.createdAt,
});

export const selectUserInfo = createSelector(selectedUserInfo, (memo) => memo);

const selectedUserCover = ({ user, activeUser }) => {
  const currUser = user.user._id === activeUser.user._id;
  return {
    profileImg: currUser ? activeUser.user.profileImg : user.user.profileImg,
    coverImg: currUser ? activeUser.user.coverImg : user.user.coverImg,
  };
};

export const selectUserCover = createSelector(
  selectedUserCover,
  (memo) => memo
);

export const selectUserSearchResult = ({ user }) => user.searchResult;
