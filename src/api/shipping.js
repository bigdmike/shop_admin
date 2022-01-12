import {
    patch,
    get
} from '@/common/request'

//

export function get_shipping() {
    return get('admin/shipping')
}
export function update_shipping(item) {
    return patch('admin/shipping', item, "已成功更新運送方式")
}