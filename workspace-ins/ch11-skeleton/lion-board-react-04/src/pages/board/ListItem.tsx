import type { PostListItem } from "@/types";
import { Link } from "react-router";

function ListItem({ post }: { post: PostListItem }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{post._id}</td>
      <td className="p-2 truncate indent-4"><Link to={`/${post.type}/${post._id}`} className="hover:text-orange-500 hover:underline">{post.title}</Link></td>
      <td className="p-2 text-center truncate">{post.user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{post.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{post.repliesCount}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">{post.updatedAt}</td>
    </tr>
  );
}

export default ListItem;