require "test_helper"

class LevelImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get level_images_index_url
    assert_response :success
  end

  test "should get show" do
    get level_images_show_url
    assert_response :success
  end
end
