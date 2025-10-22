<template>
    <v-app>
        <div class="style-container">
            <v-container fluid>
                <v-row class="full-height" justify="center" align="center">
                    <div>
                        <center>
                            <span class="white--text title-error">404</span><br>
                            <span class="white--text subtitle-error">Page Not Found</span>
                            <img
                                class="w-full h-96 mb-8"
                                src="../../assets/undraw_taken_re_yn20.svg"
                            />
                            <v-btn 
                                outlined 
                                color="white" 
                                @click="$router.go(-1)"
                            >
                                Return...
                            </v-btn>
                        </center>
                    </div>
                </v-row>
            </v-container>
        </div>
    </v-app>
</template>

<style scoped>
.style-container{
    height: 100vh;
    background-color: white;
}

.title-error{
    font-size: 36px;
    font-weight: 700;
}

.subtitle-error{
    font-size: 25px;
    font-weight: 500;
}

.full-height{
    height: 100vh;
}

</style>