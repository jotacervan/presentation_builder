require 'rails_helper'

describe 'Visitor sign in', :js, :focus do
  let(:user) { create(:user) }
  it 'user is redirected to root path' do
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
    expect(page).to have_current_path('/')
  end
end