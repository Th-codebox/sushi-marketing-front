<template>
  <v-container
    id="login-view"
    class="fill-height"
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="12">
        <v-slide-y-transition appear>
          <material-card
            light
            max-width="350"
            rounded
            class="mx-auto"
            color="accent"
            full-header
          >
            <template #heading>
              <div class="text-center pa-5">
                <div class="text-h4 font-weight-bold white--text">
                  Login
                </div>
                <div class="mt-4">
                  <v-btn
                    icon
                    class="mx-2"
                  >
                    <v-icon>
                      mdi-facebook
                    </v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    class="mx-2"
                  >
                    <v-icon>
                      mdi-twitter
                    </v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    class="mx-2"
                  >
                    <v-icon>
                      mdi-google-plus
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </template>

            <v-card-text class="text-center">
              <div class="text-center font-weight-light">
                Or Be Classical
              </div>

              <v-text-field
                class="mt-10"
                color="secondary"
                placeholder="First Name..."
                prepend-icon="mdi-face"
              />

              <v-text-field
                color="secondary"
                placeholder="Email..."
                prepend-icon="mdi-email"
              />

              <v-text-field
                class="mb-8"
                color="secondary"
                placeholder="Password..."
                prepend-icon="mdi-lock-outline"
              />

              <v-btn
                color="accent"
                rounded
                text
                large
              >
                Let's Go
              </v-btn>
            </v-card-text>
          </material-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'LoginView',

    data: () => ({
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook',
        },
        {
          href: '#',
          icon: 'mdi-twitter',
        },
        {
          href: '#',
          icon: 'mdi-github',
        },
      ],
    }),
  }
</script>
