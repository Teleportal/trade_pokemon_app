class OwnedPokemonsController < ApplicationController
  before_action :set_owned_pokemon, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: [:index]
  skip_before_action :verify_authenticity_token, :only => [:create, :destroy]

  # GET /owned_pokemons
  # GET /owned_pokemons.json
  def index
    @owned_pokemons = current_user.owned_pokemons
  end

  # GET /owned_pokemons/1
  # GET /owned_pokemons/1.json
  def show
    puts params
    offers = OwnedPokemon.find(params[:id].to_i).offers
    # offers = offered_pokemons.map { |offered_pokemon| Offer.find(offered_pokemon.offer_id) }
    # @owned_pokemons = offers.map { |offer| OwnedPokemon.find(offered_pokemon.offer_id) }
    p 1
    p offers
    offered_pokemons = offers.map { |offer| OfferedPokemon.all.where({offer_id: offer.id.to_i}) }
    p 2
    p offered_pokemons
    filtered_offered_pokemons = offered_pokemons.flatten.select{|offered_pokemon| offered_pokemon[:owned_pokemon_id].to_i != params[:id].to_i}
    p 3
    p filtered_offered_pokemons
    @owned_pokemons = filtered_offered_pokemons.map { |offered_pokemon|  OwnedPokemon.find(offered_pokemon[:owned_pokemon_id].to_i)}
    p 4
    puts @owned_pokemons
    # render 'index.json.jbuilder'
    render json: @owned_pokemons
  end

  # GET /owned_pokemons/new
  def new
    @owned_pokemon = OwnedPokemon.new
  end

  # GET /owned_pokemons/1/edit
  def edit
  end

  # POST /owned_pokemons
  # POST /owned_pokemons.json
  def create
    puts 'It is in create'
    puts "params #{owned_pokemon_params}"
    # parameters = owned_pokemon_params
    parameters = owned_pokemon_params.merge!(user_id: current_user.id)
    puts "params v2 #{parameters}"
    @owned_pokemon = OwnedPokemon.new(parameters)

    respond_to do |format|
      if @owned_pokemon.save
        format.html { redirect_to @owned_pokemon, notice: 'Owned pokemon was successfully created.' }
        format.json { render :show, status: :created, location: @owned_pokemon }
      else
        format.html { render :new }
        format.json { render json: @owned_pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /owned_pokemons/1
  # PATCH/PUT /owned_pokemons/1.json
  def update
    respond_to do |format|
      if @owned_pokemon.update(owned_pokemon_params)
        format.html { redirect_to @owned_pokemon, notice: 'Owned pokemon was successfully updated.' }
        format.json { render :show, status: :ok, location: @owned_pokemon }
      else
        format.html { render :edit }
        format.json { render json: @owned_pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /owned_pokemons/1
  # DELETE /owned_pokemons/1.json
  def destroy
    @owned_pokemon.destroy
    respond_to do |format|
      format.html { redirect_to owned_pokemons_url, notice: 'Owned pokemon was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_owned_pokemon
      @owned_pokemon = OwnedPokemon.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def owned_pokemon_params
      params.require(:owned_pokemon).permit(:user_id, :nickname, :combat_power, :pokemon_id)
    end
end
