/**
 *
 *
 * @param string $object the object type
 * @param string $field_name name of the field to retrieve
 * @param WP_Rest_Request $request
 * @return string
 */
function get_likes($post, $field_name, $request)
{
    $hearts = get_post_meta($post['id'], 'likes', true);
    $hearts = ! empty($hearts) ? $hearts : 0;
    return $hearts;
}
/**
 * Update
 *
 * @param string $value - the new value to be saved
 * @param string $field_name - name of the field to retrieve
 * @param WP_Rest_Request $request - the current rest request object
 * @return string
 */
function set_likes($value, $post, $field_name)
{
    $likes = get_likes($post) + $value;
    return update_post_meta($post['id'], $field_name, $likes);
}