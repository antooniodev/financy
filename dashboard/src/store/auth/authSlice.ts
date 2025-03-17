import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISessionResponse } from "../../entitites"
import { api } from "../../services/api"
import { RootState } from "../store"

const initialState: ISessionResponse = {
  token: "",
  user: {
    userId: "",
    firstName: "",
    monthlyGoal: 0,
  },
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.token = ""
      state.user = {
        userId: "",
        firstName: "",
        monthlyGoal: 0,
      }
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/login"
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<ISessionResponse>) => {
        state.token = payload.token
        state.user = payload.user
        localStorage.setItem("token", payload.token)
        localStorage.setItem("user", JSON.stringify(payload.user))
      }
    )
  },
})

export const { clearSession } = authSlice.actions

export const selectUserState = (state: RootState) => state.auth.user

export default authSlice.reducer
