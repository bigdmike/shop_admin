export default {
    methods: {
        async SendPostData(url, data) {
            this.$store.commit("SetPageLoading", true)
            return new Promise(resolve => {
                let vm = this
                let config = {
                    headers: {
                        Authorization: `${this.$cookie.get("account_token")}`
                    }
                }
                this.axios.post(url, data, config)
                    .then((response) => {
                        this.$store.commit("SetPageLoading", false)
                        if (response.data.status != 'success') {
                            if (response.data.msg == "token error") {
                                console.log("token error")
                                vm.RemoveToken();
                                vm.$router.push("/login")
                                resolve("error");
                            } else {
                                this.$store.commit("SetDialog", {
                                    title: "發生錯誤",
                                    content: response.data.msg,
                                    status: true
                                })
                                resolve("error");
                            }
                        } else {
                            resolve(response.data);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.RemoveToken();
                        vm.$router.push("/login")
                        resolve("error");
                    });
            })
        },
        async SendGetData(url) {
            this.$store.commit("SetPageLoading", true)
            return new Promise(resolve => {
                let vm = this
                let config = {
                    headers: {
                        Authorization: `${this.$cookie.get("account_token")}`
                    }
                }
                this.axios.get(url, config)
                    .then((response) => {
                        this.$store.commit("SetPageLoading", false)
                        if (response.data.status != 'success') {
                            if (response.data.msg == "token error") {
                                console.log("token error")
                                vm.RemoveToken();
                                vm.$router.push("/login")
                                resolve("error");
                            } else {
                                this.$store.commit("SetDialog", {
                                    title: "發生錯誤",
                                    content: response.data.msg,
                                    status: true
                                })
                                resolve("error");
                            }
                        } else {
                            resolve(response.data);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.RemoveToken();
                        vm.$router.push("/login")
                        resolve("error");
                    });
            })
        },
        async SendFormData(url, data) {
            this.$store.commit("SetPageLoading", true)
            return new Promise(resolve => {
                let vm = this
                let config = {
                    headers: {
                        Authorization: `${this.$cookie.get("account_token")}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.axios.post(url, data, config)
                    .then((response) => {
                        this.$store.commit("SetPageLoading", false)
                        if (response.data.status != 'success') {
                            if (response.data.msg == "token error") {
                                console.log("token error")
                                vm.RemoveToken();
                                vm.$router.push("/login")
                                resolve("error");
                            } else {
                                this.$store.commit("SetDialog", {
                                    title: "發生錯誤",
                                    content: response.data.msg,
                                    status: true
                                })
                                resolve("error");
                            }
                        } else {
                            resolve(response.data);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.RemoveToken();
                        vm.$router.push("/login")
                        resolve("error");
                    });
            })
        },
        async CheckToken() {
            this.$store.commit("SetPageLoading", true)
            return new Promise(resolve => {
                let vm = this
                let config = {
                    headers: {
                        Authorization: `${this.$cookie.get("account_token")}`
                    }
                }
                this.axios.get(process.env.VUE_APP_BASE_API + "https://www.reracesport.com/api/admin/check_token.php", config)
                    .then((response) => {
                        this.$store.commit("SetPageLoading", false)
                        if (response.data.status != 'success') {
                            if (response.data.msg == "token error") {
                                console.log("token error")
                                vm.RemoveToken();
                                vm.$router.push("/login")
                                resolve("");
                            } else {
                                resolve("");
                            }
                        } else {
                            resolve("");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.RemoveToken();
                        vm.$router.push("/login")
                        resolve("error");
                    });
            })
        },

        RemoveToken() {
            this.$cookie.delete("account_token")
            this.$cookie.delete("account_data")
        }
    }
}