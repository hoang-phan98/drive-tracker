<template>
    <div id="menu">
        <b-navbar toggleable="md" type="dark" variant="info">

          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#">
              <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="BV">
              Drive Tracker
            </b-navbar-brand>

          <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
              <b-nav-item href="#">Folders</b-nav-item>
              <b-nav-item href="#" disabled>Files</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>

              <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Log out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

          </b-collapse>
        </b-navbar>
    </div>
</template>
