<template>
  <v-container
    id="extended-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Extended Tables"
      link="componetns/simple-tables"
    />

    <material-card
      icon="mdi-clipboard-text"
      icon-small
      color="accent"
      title="Simple Table"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Job Position</th>
            <th>Since</th>
            <th class="text-right">
              Salary
            </th>
            <th class="text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Andrew Mike</td>
            <td>Developer</td>
            <td>2013</td>
            <td class="text-right">
              € 99,225
            </td>
            <td class="text-right">
              <app-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="px-2 ml-1"
                elevation="0"
                min-width="0"
                small
              >
                <v-icon
                  small
                  v-text="action.icon"
                />
              </app-btn>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>John Doe</td>
            <td>Designer</td>
            <td>2012</td>
            <td class="text-right">
              € 89,241
            </td>
            <td class="text-right">
              <app-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="px-1 ml-1"
                fab
                elevation="0"
                x-small
              >
                <v-icon v-text="action.icon" />
              </app-btn>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Alex Mike</td>
            <td>Designer</td>
            <td>2010</td>
            <td class="text-right">
              € 92,144
            </td>
            <td class="text-right">
              <app-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="ml-1"
                fab
                icon
                elevation="0"
                x-small
              >
                <v-icon
                  small
                  v-text="action.icon"
                />
              </app-btn>
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Mike Monday</td>
            <td>Marketing</td>
            <td>2013</td>
            <td class="text-right">
              € 49,990
            </td>
            <td class="text-right">
              <app-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="px-1 ml-1"
                fab
                elevation="0"
                x-small
              >
                <v-icon v-text="action.icon" />
              </app-btn>
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Paul Dickens</td>
            <td>Communications</td>
            <td>2015</td>
            <td class="text-right">
              € 69,201
            </td>
            <td class="text-right">
              <app-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="px-2 ml-1"
                min-width="0"
                elevation="0"
                small
              >
                <v-icon
                  small
                  v-text="action.icon"
                />
              </app-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </material-card>

    <div class="my-12" />

    <material-card
      icon="mdi-clipboard"
      title="Checked Table"
      icon-small
      color="accent"
    >
      <v-data-table
        :headers="headers"
        :items="selections"
        hide-default-footer
        show-select
      >
        <template #footer>
          <v-card-text>
            <v-row
              align="center"
              class="ma-0"
              justify="end"
            >
              <strong class="text-h4 font-weight-bold">Total</strong>

              <div class="text-h3 font-weight-light ml-12">
                € 12,999
              </div>
            </v-row>
          </v-card-text>
        </template>
      </v-data-table>
    </material-card>

    <div class="my-12" />

    <material-card
      icon="mdi-vuetify"
      title="Shopping Cart Table"
      icon-small
      color="accent"
    >
      <v-data-table
        :headers="productHeaders"
        :items="products"
        hide-default-footer
      >
        <template #item="{ item }">
          <tr>
            <td>
              <v-img
                :src="item.src"
                class="mx-auto"
                max-width="75"
              />
            </td>

            <td>
              <div
                class="purple--text text-h3"
                v-text="item.name"
              />
              <div class="grey--text text-body-1 font-weight-light">
                by {{ item.brand }}
              </div>
            </td>

            <td v-text="item.color" />

            <td v-text="item.size" />

            <td
              class="text-right"
              v-text="item.price"
            />

            <td
              class="text-right"
              v-text="item.qty"
            />

            <td
              class="text-right"
              v-text="item.amount"
            />
          </tr>
        </template>

        <template #footer>
          <v-divider />

          <v-card-text>
            <v-row
              align="center"
              class="ma-0"
              justify="end"
            >
              <strong class="text-h4 font-weight-bold">Total</strong>

              <div class="text-h3 ml-12">
                € 2,346
              </div>
            </v-row>
          </v-card-text>

          <v-divider />

          <div class="text-right py-6 px-4">
            <app-btn
              color="info"
              rounded
              elevation="0"
            >
              Complete Purchase

              <v-icon>mdi-chevron-right</v-icon>
            </app-btn>
          </div>
        </template>
      </v-data-table>
    </material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'ExtendedTablesView',

    data: () => ({
      actions: [
        { color: 'info', icon: 'mdi-account' },
        { color: 'success', icon: 'mdi-pencil' },
        { color: 'error', icon: 'mdi-close' },
      ],
      headers: [
        {
          text: '#',
          value: 'id',
        },
        {
          text: 'Product Name',
          value: 'name',
        },
        {
          text: 'Type',
          value: 'type',
        },
        {
          align: 'end',
          text: 'Qty',
          value: 'qty',
        },
        {
          align: 'end',
          text: 'Price',
          value: 'price',
        },
        {
          align: 'end',
          text: 'Amount',
          value: 'amount',
        },
      ],
      productHeaders: [
        {
          sortable: false,
          text: '',
          value: 'src',
        },
        {
          text: 'Product',
          value: 'name',
        },
        {
          text: 'Color',
          value: 'color',
        },
        {
          text: 'Size',
          value: 'size',
        },
        {
          align: 'end',
          text: 'Price',
          value: 'price',
        },
        {
          align: 'end',
          text: 'Qty',
          value: 'qty',
        },
        {
          align: 'end',
          text: 'Amount',
          value: 'amount',
        },
      ],
      products: [
        {
          src: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/product1.jpg',
          name: 'Spring Jacket',
          brand: 'Dolce & Gabbana',
          color: 'Red',
          size: 'M',
          price: '€ 549',
          amount: '€ 549',
          qty: 1,
        },
        {
          src: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/product2.jpg',
          name: 'Short Pants',
          brand: 'Pucca',
          color: 'Purple',
          size: 'M',
          price: '€ 499',
          amount: '€ 499',
          qty: 2,
        },
        {
          src: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/product3.jpg',
          name: 'Pencil Skirt',
          brand: 'Valentino',
          color: 'White',
          size: 'XL',
          price: '€ 799',
          amount: '€ 799',
          qty: 1,
        },
      ],
      selections: [
        {
          id: 1,
          name: 'Moleskine Agenda',
          type: 'Office',
          qty: 25,
          price: '€ 49',
          amount: '€ 1,225',
        },
        {
          id: 2,
          name: 'Stabilo Pen',
          type: 'Office',
          qty: 30,
          price: '€ 10',
          amount: '€ 300',
        },
        {
          id: 3,
          name: 'A4 Paper Pack',
          type: 'Office',
          qty: 30,
          price: '€ 10.99',
          amount: '€ 109',
        },
        {
          id: 4,
          name: 'Apple iPad',
          type: 'Meeting',
          qty: 10,
          price: '€ 499',
          amount: '€ 4,990',
        },
        {
          id: 5,
          name: 'Apple iPhone',
          type: 'Communication',
          qty: 10,
          price: '€ 599',
          amount: '€ 5,999',
        },
      ],
    }),
  }
</script>
